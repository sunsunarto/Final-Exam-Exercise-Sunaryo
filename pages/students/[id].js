import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Button,
  Skeleton,
  message,
  Popconfirm,
  Form,
} from "antd";
import EditStudentModal from "../../components/EditStudentModal.js"; // new component

const { Title, Text } = Typography;

export default function StudentDetail({ student }) {
  const router = useRouter();
  const [current, setCurrent] = useState(student || null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  if (router.isFallback) return <Skeleton active />;

  function openEdit() {
    form.setFieldsValue({
      firstName: current.firstName,
      lastName: current.lastName,
      email: current.email,
      phone: current.phone,
      university: current.university,
    });
    setEditing(true);
  }

  function saveEdit() {
    form.validateFields().then((vals) => {
      setCurrent((prev) => ({ ...prev, ...vals }));
      setEditing(false);
      message.success("Updated (local simulation)");
    });
  }

  function handleDelete() {
    message.success("Deleted (local simulation)");
    router.push("/students");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Button style={{ marginBottom: 12 }} onClick={() => router.back()}>
        Back
      </Button>

      <Card>
        {!current ? (
          <Skeleton active />
        ) : (
          <Row gutter={16}>
            <Col span={6}>
              <Avatar src={current.image} size={120} />
            </Col>
            <Col span={18}>
              <Title level={3}>
                {current.firstName} {current.lastName}
              </Title>
              <div>
                <Text strong>Email:</Text> {current.email}
              </div>
              <div>
                <Text strong>Phone:</Text> {current.phone}
              </div>
              <div>
                <Text strong>Age:</Text> {current.age}
              </div>
              <div>
                <Text strong>University:</Text> {current.university || "-"}
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong>Address:</Text> {formatAddress(current.address)}
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong>Company:</Text> {current.company?.name || "-"}
              </div>

              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  onClick={openEdit}
                  style={{ marginRight: 8 }}
                >
                  Edit Student
                </Button>
                <Popconfirm title="Delete this student?" onConfirm={handleDelete}>
                  <Button danger>Delete Student</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
        )}
      </Card>

      <EditStudentModal
        visible={editing}
        onCancel={() => setEditing(false)}
        onOk={saveEdit}
        form={form}
      />
    </div>
  );
}

function formatAddress(a) {
  if (!a) return "-";
  return [a.address, a.city, a.state, a.postalCode].filter(Boolean).join(", ");
}

export async function getStaticPaths() {
  try {
    const res = await fetch("https://dummyjson.com/users?limit=20");
    const json = await res.json();
    const users = json.users || [];
    const paths = users.map((u) => ({ params: { id: String(u.id) } }));
    return { paths, fallback: true };
  } catch (err) {
    console.error("getStaticPaths error", err);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${params.id}`);
    if (!res.ok) return { notFound: true };
    const student = await res.json();
    return { props: { student }, revalidate: 60 * 60 }; // revalidate hourly
  } catch (err) {
    console.error("getStaticProps error", err);
    return { notFound: true };
  }
}
