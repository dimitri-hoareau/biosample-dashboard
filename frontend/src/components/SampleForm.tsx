import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button, Card } from "antd";
import dayjs from "dayjs";
import {
  createBioSample,
  fetchBioSampleById,
  updateBioSample,
} from "../services/api.ts";

const { Option } = Select;

function SampleForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const loadSample = async () => {
        try {
          const data = await fetchBioSampleById(parseInt(id));

          form.setFieldsValue({
            ...data,
            sampling_date: data.sampling_date
              ? dayjs(data.sampling_date)
              : undefined,
          });
        } catch (err) {
          console.error("Error loading sample:", err);
        }
      };

      loadSample();
    }
  }, [id, form, isEditMode]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const formattedValues = {
        ...values,
        sampling_date: values.sampling_date?.format("YYYY-MM-DD"),
      };

      if (isEditMode) {
        await updateBioSample(parseInt(id), formattedValues);
      } else {
        await createBioSample(formattedValues);
      }

      navigate("/");
    } catch (err) {
      console.error("Error saving sample:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={isEditMode ? "Edit Sample" : "Add New Sample"}
      extra={<Button onClick={() => navigate("/")}>Back to List</Button>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ type: "water" }}
      >
        <Form.Item
          name="sampling_location"
          label="Sampling Location"
          rules={[
            { required: true, message: "Please enter the sampling location" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "Please select the sample type" }]}
        >
          <Select>
            <Option value="water">Water</Option>
            <Option value="chocolate">Chocolate</Option>
            <Option value="flour">Flour</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="sampling_date"
          label="Sampling Date"
          rules={[
            { required: true, message: "Please select the sampling date" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="sampling_operator"
          label="Sampling Operator"
          rules={[
            { required: true, message: "Please enter the sampling operator" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditMode ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SampleForm;
