import { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBioSamples, deleteBioSample } from "../services/api.ts";
import type { BioSample } from "../types";

function SampleList() {
  const [samples, setSamples] = useState<BioSample[]>([]);
  const navigate = useNavigate();

  const loadSamples = async () => {
    try {
      const data = await fetchBioSamples();
      setSamples(data);
    } catch (err) {
      console.error("Error loading samples:", err);
    }
  };

  useEffect(() => {
    loadSamples();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBioSample(id);

      // Update list after deleting sample
      setSamples(samples.filter((sample) => sample.id !== id));

      console.log("Sample deleted successfully");
    } catch (err) {
      console.error("Error deleting sample:", err);
    }
  };

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
        <Space>
          <Button type="link" onClick={() => navigate(`/samples/${record.id}`)}>
            View
          </Button>
          <Button
            type="link"
            onClick={() => navigate(`/samples/${record.id}/edit`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Sample"
            description="Are you sure you want to delete this sample?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
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
