import React from "react";
import { Modal, Form, Input } from "antd";

export default function EditStudentModal({ visible, onCancel, onOk, form }) {
  return (
    <Modal
      title="Edit Student"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Enter a valid email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="university" label="University">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
