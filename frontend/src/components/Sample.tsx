import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, List, Input, Form, Divider } from "antd";
import { fetchBioSampleById, addComment } from "../services/api.ts";
import type { BioSample, Comment } from "../types";

const { TextArea } = Input;

function Sample() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sample, setSample] = useState<BioSample | null>(null);
  const [form] = Form.useForm();

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

  const handleAddComment = async (values: { text: string }) => {
    try {
      if (id) {
        await addComment({
          text: values.text,
          biosample: parseInt(id),
        });

        const updatedSample = await fetchBioSampleById(parseInt(id));
        setSample(updatedSample);
        form.resetFields();
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (sample) {
    return (
      <>
        <Card
          title={`Sample Details: SP-${sample.id}`}
          extra={<Button onClick={() => navigate("/")}>Back</Button>}
        >
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

        <Divider>Comments</Divider>

        <List
          dataSource={sample.comments || []}
          renderItem={(comment: Comment) => (
            <List.Item>
              <List.Item.Meta
                title={new Date(comment.created_at).toLocaleString()}
                description={comment.text}
              />
            </List.Item>
          )}
          locale={{ emptyText: "No comments yet" }}
        />

        <Form
          form={form}
          onFinish={handleAddComment}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Please enter a comment" }]}
          >
            <TextArea rows={4} placeholder="Add a comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Sample;
