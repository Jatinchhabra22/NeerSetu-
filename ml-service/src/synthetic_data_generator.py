#!/usr/bin/env python3
import numpy as np
import pandas as pd
from pathlib import Path


def create_synthetic_datasets(seed: int = 42):
  rng = np.random.default_rng(seed)
  root = Path(__file__).resolve().parents[2]
  data_dir = root / "Datasets"
  base_health = pd.read_csv(data_dir / "1_Health_Surveillance_Data_NE_India.csv")
  base_water = pd.read_csv(data_dir / "2_Water_Quality_Data_NE_India.csv")
  base_env = pd.read_csv(data_dir / "3_Environmental_Rainfall_Data_NE_India.csv")
  base_outbreak = pd.read_csv(data_dir / "4_Outbreak_Labels_Target_Data_NE_India.csv")

  # 1) Seasonal water quality synthetic set
  water_syn = base_water.sample(n=min(1500, len(base_water)), replace=True, random_state=seed).reset_index(drop=True)
  monsoon_factor = rng.uniform(1.05, 1.35, len(water_syn))
  water_syn["turbidity_ntu"] = (water_syn["turbidity_ntu"] * monsoon_factor).round(3)
  water_syn["bacteria_ecoli_cfu_100ml"] = (water_syn["bacteria_ecoli_cfu_100ml"] * monsoon_factor * rng.uniform(1.0, 1.2, len(water_syn))).round(3)
  water_syn["pH"] = np.clip(water_syn["pH"] + rng.normal(0, 0.22, len(water_syn)), 5.3, 8.9).round(2)
  water_syn["is_potable"] = ((water_syn["bacteria_ecoli_cfu_100ml"] < 120) & (water_syn["turbidity_ntu"] < 5.5)).astype(int)
  water_syn["date"] = pd.to_datetime(water_syn["date"]) + pd.to_timedelta(rng.integers(1, 120, len(water_syn)), unit="D")
  water_syn["date"] = water_syn["date"].dt.strftime("%Y-%m-%d")
  water_syn.to_csv(data_dir / "5_Synthetic_Water_Quality_Data_NE_India.csv", index=False)

  # 2) Seasonal health symptoms synthetic set
  health_syn = base_health.sample(n=min(1500, len(base_health)), replace=True, random_state=seed + 1).reset_index(drop=True)
  symptom_lift = rng.uniform(1.0, 1.4, len(health_syn))
  for col in ["diarrhea_cases", "fever_cases", "vomiting_cases"]:
    health_syn[col] = np.maximum(0, (health_syn[col] * symptom_lift + rng.normal(1.5, 2.0, len(health_syn))).astype(int))
  health_syn["households_affected"] = (
    health_syn["diarrhea_cases"] + health_syn["fever_cases"] + health_syn["vomiting_cases"] + rng.integers(4, 20, len(health_syn))
  )
  health_syn["date"] = pd.to_datetime(health_syn["date"]) + pd.to_timedelta(rng.integers(1, 120, len(health_syn)), unit="D")
  health_syn["date"] = health_syn["date"].dt.strftime("%Y-%m-%d")
  health_syn.to_csv(data_dir / "6_Synthetic_Health_Surveillance_Data_NE_India.csv", index=False)

  # 3) Merged training set (keep schema compatible)
  health_all = pd.concat([base_health, health_syn], ignore_index=True)
  water_all = pd.concat([base_water, water_syn], ignore_index=True)
  env_all = base_env.copy()
  outbreak_all = base_outbreak.copy()
  merged = (
    health_all.merge(water_all, on=["village", "state", "date"], how="left", suffixes=("", "_w"))
    .merge(env_all, on=["village", "state", "date"], how="left", suffixes=("", "_e"))
    .merge(outbreak_all, on=["village", "state", "date"], how="left", suffixes=("", "_o"))
  )
  merged.to_csv(data_dir / "7_Enhanced_Merged_Training_Data_NE_India.csv", index=False)


if __name__ == "__main__":
  create_synthetic_datasets()
  print("Synthetic datasets generated successfully.")
