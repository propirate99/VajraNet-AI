import os
import random
import pandas as pd
import numpy as np

def generate_synthetic_dataset(output_path: str, n_samples: int = 2500):
    """
    Generates synthetic, safe IPsec flow metadata for supervised ML training.
    Does NOT contain private payloads, real IPs, or classified packets.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    random.seed(42)
    np.random.seed(42)

    classes = [
        "web_like",
        "icmp_like",
        "bulk_transfer_like",
        "video_like_udp",
        "idle_keepalive"
    ]
    sectors = ["Government", "Defence", "Healthcare"]

    rows = []
    for i in range(n_samples):
        flow_id = f"flow-synth-{i+1:05d}"
        t_class = random.choices(classes, weights=[0.30, 0.15, 0.25, 0.20, 0.10])[0]
        sector = random.choice(sectors)

        if t_class == "web_like":
            mean_len = np.random.normal(540, 110)
            std_len = np.random.normal(210, 40)
            pps = np.random.normal(24, 8)
            mean_ia = np.random.normal(42.0, 12.0)
            std_ia = np.random.normal(18.0, 6.0)
            ratio = np.random.normal(0.40, 0.15)
            bursts = np.random.randint(2, 6)
            exposure = np.random.randint(30, 60)
            anomaly = 0
            risk = "Low"

        elif t_class == "icmp_like":
            mean_len = np.random.normal(84, 4)
            std_len = np.random.normal(2, 1)
            pps = np.random.normal(1.0, 0.2)
            mean_ia = np.random.normal(1000.0, 10.0)
            std_ia = np.random.normal(2.0, 0.8)
            ratio = 1.0
            bursts = 0
            exposure = np.random.randint(10, 30)
            anomaly = 0
            risk = "Low"

        elif t_class == "bulk_transfer_like":
            mean_len = np.random.normal(1360, 45)
            std_len = np.random.normal(80, 20)
            pps = np.random.normal(180, 40)
            mean_ia = np.random.normal(5.5, 1.2)
            std_ia = np.random.normal(2.1, 0.6)
            ratio = np.random.normal(0.08, 0.03)  # Heavily one-way download
            bursts = np.random.randint(4, 12)
            exposure = np.random.randint(55, 75)
            anomaly = 0
            risk = "Moderate"

        elif t_class == "video_like_udp":
            mean_len = np.random.normal(1280, 50)
            std_len = np.random.normal(95, 25)
            pps = np.random.normal(64, 10)
            mean_ia = np.random.normal(15.6, 2.0)
            std_ia = np.random.normal(1.8, 0.5)
            ratio = np.random.normal(0.12, 0.04)
            bursts = np.random.randint(8, 20)
            exposure = np.random.randint(65, 88)
            anomaly = 1 if exposure > 80 else 0
            risk = "High" if exposure > 80 else "Moderate"

        else: # idle_keepalive
            mean_len = np.random.normal(120, 15)
            std_len = np.random.normal(8, 2)
            pps = np.random.normal(0.1, 0.03)
            mean_ia = np.random.normal(30000.0, 200.0)
            std_ia = np.random.normal(10.0, 3.0)
            ratio = 1.0
            bursts = 0
            exposure = np.random.randint(15, 35)
            anomaly = 0
            risk = "Low"

        duration = max(5.0, np.random.normal(60.0, 20.0))
        pkt_count = max(10, int(pps * duration))
        bytes_sec = max(50.0, pps * mean_len)

        rows.append({
            "flow_id": flow_id,
            "sector": sector,
            "traffic_class": t_class,
            "mean_packet_length": round(float(mean_len), 2),
            "packet_length_std": round(float(abs(std_len)), 2),
            "packets_per_second": round(float(max(0.1, pps)), 2),
            "bytes_per_second": round(float(bytes_sec), 2),
            "mean_interarrival_ms": round(float(max(0.5, mean_ia)), 2),
            "interarrival_std_ms": round(float(max(0.1, std_ia)), 2),
            "upload_download_ratio": round(float(max(0.01, min(1.0, ratio))), 2),
            "flow_duration_seconds": round(float(duration), 2),
            "packet_count": pkt_count,
            "burst_count": bursts,
            "unique_spi_count": random.choice([2, 2, 2, 4]),
            "nat_t_detected": random.choice([0, 0, 1]),
            "metadata_exposure_score": exposure,
            "anomaly_label": anomaly,
            "risk_label": risk
        })

    df = pd.DataFrame(rows)
    df.to_csv(output_path, index=False)
    print(f"[VajraNet Dataset Generator] Successfully generated {len(df)} synthetic rows at: {output_path}")

if __name__ == "__main__":
    out_file = os.path.join(os.path.dirname(__file__), "..", "..", "data", "synthetic_ipsec_flow_dataset.csv")
    generate_synthetic_dataset(out_file)
