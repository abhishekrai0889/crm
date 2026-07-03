import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import Selectbox from "../ui/Selectbox";
import Textarea from "../ui/Textarea";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  PhoneOutlined,
  HomeOutlined,
  WorkOutlineOutlined,
  SchoolOutlined,
  CalendarTodayOutlined,
  DescriptionOutlined,
  LanguageOutlined,
  MaleOutlined,
  FemaleOutlined,
} from "@mui/icons-material";

function Login() {
  const [formData, setFormData] = useState({
    // Personal Information
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",

    // Address & Location
    country: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",

    // Professional Information
    occupation: "",
    company: "",
    experience: "",
    education: "",

    // Preferences
    language: "",
    timezone: "",
    newsletter: false,

    // Additional Info
    bio: "",
    skills: "",
    interests: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Option data for select boxes
  const countryOptions = [
    { value: "", label: "Select Country" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
  ];

  const stateOptions = {
    us: [
      { value: "", label: "Select State" },
      { value: "ca", label: "California" },
      { value: "ny", label: "New York" },
      { value: "tx", label: "Texas" },
      { value: "fl", label: "Florida" },
      { value: "il", label: "Illinois" },
    ],
    in: [
      { value: "", label: "Select State" },
      { value: "mh", label: "Maharashtra" },
      { value: "dl", label: "Delhi" },
      { value: "ka", label: "Karnataka" },
      { value: "tn", label: "Tamil Nadu" },
      { value: "up", label: "Uttar Pradesh" },
    ],
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not", label: "Prefer not to say" },
  ];

  const occupationOptions = [
    { value: "", label: "Select Occupation" },
    { value: "developer", label: "Software Developer" },
    { value: "designer", label: "UI/UX Designer" },
    { value: "manager", label: "Project Manager" },
    { value: "analyst", label: "Business Analyst" },
    { value: "marketing", label: "Marketing Specialist" },
    { value: "sales", label: "Sales Representative" },
    { value: "teacher", label: "Teacher/Educator" },
    { value: "student", label: "Student" },
    { value: "other", label: "Other" },
  ];

  const educationOptions = [
    { value: "", label: "Select Education" },
    { value: "high-school", label: "High School" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "diploma", label: "Diploma" },
    { value: "other", label: "Other" },
  ];

  const experienceOptions = [
    { value: "", label: "Select Experience" },
    { value: "0-1", label: "0-1 Years" },
    { value: "1-3", label: "1-3 Years" },
    { value: "3-5", label: "3-5 Years" },
    { value: "5-10", label: "5-10 Years" },
    { value: "10+", label: "10+ Years" },
  ];

  const languageOptions = [
    { value: "", label: "Select Language" },
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "hindi", label: "Hindi" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Address & Location
    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    // Professional Information
    if (!formData.occupation) {
      newErrors.occupation = "Please select your occupation";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select your experience level";
    }

    // Additional Info
    if (!formData.bio) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.length < 20) {
      newErrors.bio = "Bio must be at least 20 characters";
    } else if (formData.bio.length > 500) {
      newErrors.bio = "Bio must be at most 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registration data:", formData);
      alert("Registration successful!");
      // Redirect or handle success
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        submit: "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Create Account
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Fill in all the details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <PersonOutlined className="w-5 h-5 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <TextInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                  icon={PersonOutlined}
                  iconPosition="left"
                />

                {/* Last Name */}
                <TextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                  icon={PersonOutlined}
                  iconPosition="left"
                />

                {/* Username */}
                <TextInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  required
                  minLength={3}
                  maxLength={20}
                  icon={PersonOutlined}
                  iconPosition="left"
                  autoFocus
                />

                {/* Email */}
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  icon={EmailOutlined}
                  iconPosition="left"
                  helperText="We'll never share your email"
                />

                {/* Password */}
                <div className="relative">
                  <TextInput
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    minLength={6}
                    maxLength={30}
                    icon={LockOutlined}
                    iconPosition="left"
                    helperText="Must be at least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <VisibilityOff className="w-5 h-5" />
                    ) : (
                      <Visibility className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                    icon={LockOutlined}
                    iconPosition="left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff className="w-5 h-5" />
                    ) : (
                      <Visibility className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <TextInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  icon={PhoneOutlined}
                  iconPosition="left"
                  helperText="10-digit phone number"
                />

                {/* Gender */}
                <Selectbox
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  error={errors.gender}
                  required
                  icon={MaleOutlined}
                  iconPosition="left"
                  placeholder="Select your gender"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <HomeOutlined className="w-5 h-5 text-blue-600" />
                Address & Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <Selectbox
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  options={countryOptions}
                  error={errors.country}
                  required
                  icon={LanguageOutlined}
                  iconPosition="left"
                  placeholder="Select your country"
                />

                {/* State - dynamic based on country */}
                <Selectbox
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  options={
                    stateOptions[formData.country] || [
                      { value: "", label: "Select State" },
                    ]
                  }
                  error={errors.state}
                  disabled={!formData.country}
                  icon={HomeOutlined}
                  iconPosition="left"
                  placeholder={
                    formData.country ? "Select state" : "Select country first"
                  }
                />

                {/* City */}
                <TextInput
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  icon={HomeOutlined}
                  iconPosition="left"
                />

                {/* Zip Code */}
                <TextInput
                  label="Zip Code"
                  name="zipCode"
                  type="text"
                  placeholder="Enter zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  icon={HomeOutlined}
                  iconPosition="left"
                />
              </div>

              {/* Address - Full width */}
              <div className="mt-4">
                <Textarea
                  label="Address"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                  minLength={10}
                  maxLength={200}
                  rows={3}
                  icon={HomeOutlined}
                  iconPosition="left"
                  showCharCount
                  helperText="Please enter your complete address"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <WorkOutlineOutlined className="w-5 h-5 text-blue-600" />
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Occupation */}
                <Selectbox
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  options={occupationOptions}
                  error={errors.occupation}
                  required
                  icon={WorkOutlineOutlined}
                  iconPosition="left"
                  placeholder="Select your occupation"
                />

                {/* Company */}
                <TextInput
                  label="Company"
                  name="company"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleChange}
                  icon={WorkOutlineOutlined}
                  iconPosition="left"
                />

                {/* Education */}
                <Selectbox
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  options={educationOptions}
                  error={errors.education}
                  icon={SchoolOutlined}
                  iconPosition="left"
                  placeholder="Select your education"
                />

                {/* Experience */}
                <Selectbox
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  options={experienceOptions}
                  error={errors.experience}
                  required
                  icon={CalendarTodayOutlined}
                  iconPosition="left"
                  placeholder="Select experience level"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <DescriptionOutlined className="w-5 h-5 text-blue-600" />
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Language */}
                <Selectbox
                  label="Preferred Language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  options={languageOptions}
                  icon={LanguageOutlined}
                  iconPosition="left"
                  placeholder="Select your language"
                />

                {/* Timezone */}
                <Selectbox
                  label="Timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select Timezone" },
                    { value: "est", label: "Eastern Time (ET)" },
                    { value: "cst", label: "Central Time (CT)" },
                    { value: "mst", label: "Mountain Time (MT)" },
                    { value: "pst", label: "Pacific Time (PT)" },
                    { value: "utc", label: "UTC" },
                    { value: "ist", label: "Indian Standard Time (IST)" },
                  ]}
                  icon={CalendarTodayOutlined}
                  iconPosition="left"
                  placeholder="Select your timezone"
                />
              </div>
            </div>

            {/* Bio & Skills */}
            <div className="space-y-4">
              {/* Bio */}
              <Textarea
                label="Bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleChange}
                error={errors.bio}
                required
                minLength={20}
                maxLength={500}
                rows={4}
                icon={DescriptionOutlined}
                iconPosition="left"
                showCharCount
                helperText="Write a brief bio about yourself (20-500 characters)"
              />

              {/* Skills */}
              <Textarea
                label="Skills"
                name="skills"
                placeholder="List your skills (separated by commas)"
                value={formData.skills}
                onChange={handleChange}
                maxLength={200}
                rows={2}
                icon={WorkOutlineOutlined}
                iconPosition="left"
                showCharCount
                helperText="e.g., React, JavaScript, Python, UI/UX Design"
              />

              {/* Interests */}
              <Textarea
                label="Interests"
                name="interests"
                placeholder="What are you interested in?"
                value={formData.interests}
                onChange={handleChange}
                maxLength={200}
                rows={2}
                icon={DescriptionOutlined}
                iconPosition="left"
                showCharCount
                helperText="Share your hobbies and interests"
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.submit}
              </div>
            )}

            {/* Newsletter Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    newsletter: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
              />
              <label htmlFor="newsletter" className="text-sm text-slate-600">
                Subscribe to our newsletter for updates and offers
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 transform hover:scale-[1.02]
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                shadow-lg shadow-blue-500/30
                flex items-center justify-center gap-2
              `}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-600 mt-4">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Sign in here
              </a>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
