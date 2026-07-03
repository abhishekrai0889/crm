import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../../ui/Form";
import TextInput from "../../ui/TextInput";
import Textarea from "../../ui/Textarea";
import Selectbox from "../../ui/Selectbox";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    topic: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* First Row */}

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="First name"
            name="firstName"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleChange}
            required
            icon={PersonOutlineOutlinedIcon}
          />

          <TextInput
            label="Last name"
            name="lastName"
            placeholder="Cooper"
            value={formData.lastName}
            onChange={handleChange}
            required
            icon={PersonOutlineOutlinedIcon}
          />
        </div>

        {/* Second */}

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Work email"
            type="email"
            name="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            icon={EmailOutlinedIcon}
          />

          <TextInput
            label="Phone"
            name="phone"
            placeholder="+91 98XXX XXXXX"
            value={formData.phone}
            onChange={handleChange}
            icon={PhoneOutlinedIcon}
          />
        </div>

        {/* Third */}

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Company"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            required
            icon={BusinessOutlinedIcon}
          />

        <Selectbox
  label="Company size"
  name="companySize"
  value={formData.companySize}
  onChange={handleChange}
  required
  icon={GroupsOutlinedIcon}
  options={[
    { label: "Select an option", value: "" },
    { label: "1-10", value: "1-10" },
    { label: "11-50", value: "11-50" },
    { label: "51-200", value: "51-200" },
    { label: "200+", value: "200+" },
  ]}
/>
        </div>

        {/* Topic */}

     <Selectbox
  label="What can we help with?"
  name="topic"
  value={formData.topic}
  onChange={handleChange}
  required
  icon={HelpOutlineOutlinedIcon}
  options={[
    {
      label: "Select an option",
      value: "",
    },
    {
      label: "Sales",
      value: "sales",
    },
    {
      label: "Support",
      value: "support",
    },
    {
      label: "Demo",
      value: "demo",
    },
  ]}
/>

        {/* Message */}
<Textarea
  label="Message"
  name="message"
  rows={6}
  placeholder="Tell us a little about your team and what you're looking for..."
  value={formData.message}
  onChange={handleChange}
  required
  icon={ChatOutlinedIcon}
/>
        {/* Checkbox */}

        <label className="flex items-start gap-3 text-[15px] text-[var(--ink-700)]">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-[var(--blue-600)]"
          />

          <span>
            I agree to ENTHIS processing my data to respond to this enquiry, per
            the{" "}
            <Link
              to="/privacy"
              className="font-semibold text-[var(--blue-600)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {/* Button */}

        <button
          type="submit"
          className="flex h-[56px] w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--blue-600)] text-[16px] font-semibold text-white transition hover:bg-[var(--blue-700)]"
        >
          Send message
        </button>
      </Form>
    </div>
  );
};

export default ContactForm;