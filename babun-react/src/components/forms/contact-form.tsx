import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../common/err-msg";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required").label("Name"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .label("Email"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .label("Message"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(
        "api/contact/",
        data,
        {
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );

      // Show success message and reset the form
      alert("Message sent successfully!");
      reset();
    } catch (error: any) {
      // Handle errors (optional)
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  return (
    <form id="contact-form" onSubmit={onSubmit} className="contact-form">
      <div className="messages"></div>
      <div className="row controls">
        <div className="col-12">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              placeholder="Your Name*"
              {...register("name")}
              id="name-input"
              name="name"
              className="form-control"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message as string} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta form-group mb-40">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              placeholder="Email Address*"
              {...register("email")}
              id="email-input"
              name="email"
              className="form-control"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message as string} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <textarea
              placeholder="Your message*"
              {...register("message")}
              id="message-input"
              name="message"
              className="form-control"
            ></textarea>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.message?.message as string} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn-four tran3s w-100 d-block">
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;