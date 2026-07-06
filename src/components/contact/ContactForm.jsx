import { useState, useRef } from "react";
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

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create refs for all form fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const companyRef = useRef(null);
  const companySizeRef = useRef(null);
  const topicRef = useRef(null);
  const messageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value?.trim()) error = "First name is required";
        break;
      case "lastName":
        if (!value?.trim()) error = "Last name is required";
        break;
      case "email":
        if (!value?.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (
          value &&
          !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            value,
          )
        ) {
          error = "Please enter a valid phone number";
        }
        break;
      case "company":
        if (!value?.trim()) error = "Company name is required";
        break;
      case "companySize":
        if (!value) error = "Company size is required";
        break;
      case "topic":
        if (!value) error = "Please select a topic";
        break;
      case "message":
        if (!value?.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateAllFields = () => {
    const errors = {};
    let isValid = true;

    // Validate each field
    const fieldsToValidate = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      companySize: formData.companySize,
      topic: formData.topic,
      message: formData.message,
    };

    Object.entries(fieldsToValidate).forEach(([name, value]) => {
      // Skip validation for optional fields if they're empty
      if (name === "phone" && !value) return;

      const error = validateField(name, value);
      if (error) {
        errors[name] = error;
        isValid = false;
      }
    });

    // Validate checkbox
    if (!formData.agree) {
      errors.agree = "You must agree to the Privacy Policy";
      isValid = false;
    }

    setFormErrors(errors);
    return { isValid, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const { isValid, errors } = validateAllFields();

    if (!isValid) {
      setIsSubmitting(false);

      // Focus on the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      const refMap = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
        company: companyRef,
        companySize: companySizeRef,
        topic: topicRef,
        message: messageRef,
      };

      const targetRef = refMap[firstErrorField];
      if (targetRef?.current) {
        // Focus on the field and trigger validation
        targetRef.current.focus();
        // If the field has a validate method, call it
        if (targetRef.current.validate) {
          targetRef.current.validate();
        }
      }

      // Scroll to the first error
      const errorElement = document.querySelector(`[id$="-error"]`);
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    // If all validations pass, submit the form
    try {
      // Your API call here
      console.log("Form submitted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      setFormData({
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

      // Show success message (you can implement toast notification here)
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      setFormErrors({
        submit: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to handle field validation on change
  const handleFieldValidation = (name, value) => {
    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return error;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* First Row - First Name & Last Name */}
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            ref={firstNameRef}
            label="First name"
            name="firstName"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleChange}
            required
            icon={PersonOutlineOutlinedIcon}
            error={formErrors.firstName}
            validateOnFocus={true}
            scrollToError={true}
          />

          <TextInput
            ref={lastNameRef}
            label="Last name"
            name="lastName"
            placeholder="Cooper"
            value={formData.lastName}
            onChange={handleChange}
            required
            icon={PersonOutlineOutlinedIcon}
            error={formErrors.lastName}
            validateOnFocus={true}
            scrollToError={true}
          />
        </div>

        {/* Second Row - Email & Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            ref={emailRef}
            label="Work email"
            type="email"
            name="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            icon={EmailOutlinedIcon}
            error={formErrors.email}
            validateOnFocus={true}
            scrollToError={true}
          />

          <TextInput
            ref={phoneRef}
            label="Phone"
            name="phone"
            placeholder="+91 98XXX XXXXX"
            value={formData.phone}
            onChange={handleChange}
            icon={PhoneOutlinedIcon}
            error={formErrors.phone}
            validateOnFocus={true}
            scrollToError={true}
          />
        </div>

        {/* Third Row - Company & Company Size */}
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            ref={companyRef}
            label="Company"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            required
            icon={BusinessOutlinedIcon}
            error={formErrors.company}
            validateOnFocus={true}
            scrollToError={true}
          />

          <Selectbox
            ref={companySizeRef}
            label="Company size"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
            icon={GroupsOutlinedIcon}
            error={formErrors.companySize}
            options={[
           
              { label: "1-10", value: "1-10" },
              { label: "11-50", value: "11-50" },
              { label: "51-200", value: "51-200" },
              { label: "200+", value: "200+" },
            ]}
          />
        </div>

        {/* Topic */}
        <Selectbox
          ref={topicRef}
          label="What can we help with?"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
          icon={HelpOutlineOutlinedIcon}
          error={formErrors.topic}
          options={[
           
            { label: "Sales", value: "sales" },
            { label: "Support", value: "support" },
            { label: "Demo", value: "demo" },
          ]}
        />

        {/* Message */}
        <Textarea
          ref={messageRef}
          label="Message"
          name="message"
          rows={6}
          placeholder="Tell us a little about your team and what you're looking for..."
          value={formData.message}
          onChange={handleChange}
          required
          icon={ChatOutlinedIcon}
          error={formErrors.message}
          validateOnFocus={true}
          scrollToError={true}
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

        {/* Error message for checkbox */}
        {formErrors.agree && (
          <div className="text-sm text-red-500 flex items-start gap-1.5">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formErrors.agree}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            flex h-[56px] w-full cursor-pointer items-center justify-center 
            rounded-xl bg-[var(--blue-600)] text-[16px] font-semibold text-white 
            transition hover:bg-[var(--blue-700)]
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </button>

        {/* Submit Error Message */}
        {formErrors.submit && (
          <div className="text-sm text-red-500 text-center">
            {formErrors.submit}
          </div>
        )}
      </Form>
    </div>
  );
};

export default ContactForm;
