import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// internal
import ErrMsg from '../common/err-msg';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(6).label("Password"),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
    reset()
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input type="text" {...register("name")} id='name' placeholder="Zubayer Hasan" />
            <ErrMsg msg={errors.name?.message as string} />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input type="email" {...register("email")} id='email' placeholder="zubayerhasan@gmail.com" />
            <ErrMsg msg={errors.email?.message as string} />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input type={`${showPass ? "text" : "password"}`} {...register("password")} id='password' placeholder="Enter Password" className="pass_log_id" />
            <span className="placeholder_icon" onClick={() => setShowPass(!showPass)}>
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <img src="/static/assets/images/icon/icon_13.svg" alt="pass-icon" />
              </span>
            </span>
            <ErrMsg msg={errors.password?.message as string} />
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember2" />
              <label htmlFor="remember2">By hitting the Register button, you agree to the <a href="#">Terms conditions</a> & <a href="#">Privacy Policy</a></label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type='submit' className="btn-four w-100 tran3s d-block mt-20">Sign up</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;