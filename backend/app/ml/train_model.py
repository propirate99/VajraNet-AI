import os
import json
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, f1_score

def train_traffic_classifier(data_path: str, model_output_dir: str):
    os.makedirs(model_output_dir, exist_ok=True)
    if not os.path.exists(data_path):
        from .generate_synthetic_dataset import generate_synthetic_dataset
        generate_synthetic_dataset(data_path)

    df = pd.read_csv(data_path)

    feature_cols = [
        "mean_packet_length",
        "packet_length_std",
        "packets_per_second",
        "bytes_per_second",
        "mean_interarrival_ms",
        "interarrival_std_ms",
        "upload_download_ratio",
        "flow_duration_seconds",
        "packet_count",
        "burst_count"
    ]

    X = df[feature_cols]
    y = df["traffic_class"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, average="weighted")
    report = classification_report(y_test, y_pred, output_dict=True)

    # Save model artifact
    model_path = os.path.join(model_output_dir, "traffic_classifier.joblib")
    joblib.dump({"model": model, "feature_names": feature_cols}, model_path)

    # Save metrics JSON
    metrics = {
        "model_name": "RandomForest-IPsec-Metadata-Classifier",
        "version": "1.0-sovereign",
        "accuracy": round(acc, 4),
        "f1_weighted": round(f1, 4),
        "features": feature_cols,
        "classes": list(model.classes_),
        "limitation_note": "Trained exclusively on controlled synthetic metadata. No payload decryption."
    }
    metrics_path = os.path.join(model_output_dir, "metrics.json")
    with open(metrics_path, "w") as f:
        json.dump(metrics, f, indent=2)

    print(f"[VajraNet ML Trainer] Model successfully trained with Accuracy: {acc*100:.2f}% | F1: {f1:.4f}")
    print(f"[VajraNet ML Trainer] Saved to: {model_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)
    dataset_file = os.path.join(base_dir, "..", "..", "data", "synthetic_ipsec_flow_dataset.csv")
    models_dir = os.path.join(base_dir, "models")
    train_traffic_classifier(dataset_file, models_dir)
