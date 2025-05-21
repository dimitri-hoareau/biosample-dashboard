import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBioSamples } from "../services/api.ts";
import type { BioSample } from "../types";

function SampleList() {
  const [samples, setSamples] = useState<BioSample[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSamples = async () => {
      try {
        const data = await fetchBioSamples();
        setSamples(data);
      } catch (err) {
        console.error("Error loading samples:", err);
      }
    };
    loadSamples();
  }, []);

  const columns = [
    {
      title: "Sample ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => `SP-${id}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Location",
      dataIndex: "sampling_location",
      key: "sampling_location",
    },
    {
      title: "Date",
      dataIndex: "sampling_date",
      key: "sampling_date",
    },
    {
      title: "Operator",
      dataIndex: "sampling_operator",
      key: "sampling_operator",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: BioSample) => (
        <Button type="link" onClick={() => navigate(`/samples/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>Biological Samples</h1>
        <Button type="primary" onClick={() => navigate("/samples/new")}>
          + Add Sample
        </Button>
      </div>
      <Table dataSource={samples} columns={columns} rowKey="id" />
    </div>
  );
}

export default SampleList;
