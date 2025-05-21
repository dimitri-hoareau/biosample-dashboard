import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions } from "antd";
import { fetchBioSampleById } from "../services/api.ts";
import type { BioSample } from "../types";

function Sample() {
  const { id } = useParams<{ id: string }>();
  const [sample, setSample] = useState<BioSample | null>(null);

  useEffect(() => {
    const loadSample = async () => {
      try {
        if (id) {
          const data = await fetchBioSampleById(parseInt(id));
          setSample(data);
        }
      } catch (err) {
        console.error("Error loading sample:", err);
      }
    };

    loadSample();
  }, [id]);

  if (sample) {
    return (
      <div>
        <Card title={`Sample Details: SP-${sample.id}`}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Sampling Location">
              {sample.sampling_location}
            </Descriptions.Item>
            <Descriptions.Item label="Type">{sample.type}</Descriptions.Item>
            <Descriptions.Item label="Sampling Date">
              {sample.sampling_date}
            </Descriptions.Item>
            <Descriptions.Item label="Sampling Operator">
              {sample.sampling_operator}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    );
  }
}

export default Sample;
