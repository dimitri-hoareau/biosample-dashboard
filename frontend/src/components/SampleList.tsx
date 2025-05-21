import { useState, useEffect } from "react";
import { Table } from "antd";
import { fetchBioSamples } from "../services/api.ts";
import type { BioSample } from "../types";
import SampleForm from "./SampleForm.tsx";

function SampleList() {
  const [samples, setSamples] = useState<BioSample[]>([]);

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
  ];

  return (
    <div>
      <h1>Biological Samples</h1>
      <Table dataSource={samples} columns={columns} rowKey="id" />
      <SampleForm />
    </div>
  );
}

export default SampleList;
