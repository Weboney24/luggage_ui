import React, { useEffect } from "react";
import Image_Helper from "../../../helper/Image_Helper";
import { Button, Form, Input } from "antd";
import { admin_login } from "../../../config/api_helper";
import { admintoken, ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/notification_helper";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { isLoginSuccess } from "../../../redux/slice/authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      console.log(values);
      const result = await admin_login(values);
      if (_.isEmpty(_.get(result, "data.data", []))) {
        return ERROR_NOTIFICATION("Invalid credentials");
      }
      dispatch(isLoginSuccess(_.get(result, "data.data", {})));
      localStorage.setItem(admintoken, _.get(result, "data.data.token", ""));
      SUCCESS_NOTIFICATION(result);
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(admintoken)) {
      navigate("/admin-dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2  flex items-center justify-center bg-white">
        <img src={Image_Helper.SUBHAM_LOGO} alt="SUBHAAM" className="w-[400px]" />
      </div>

      <div className="w-1/2 bg-black text-white flex flex-col  justify-center px-[130px] text-center ml-[170px]">
        <h2 className="text-4xl font-bold mb-4 font-title">
          Welcome <span className="text-primary">Admin </span>!!
        </h2>
        <p className="mb-8 uppercase text-sm tracking-wide font-title">Please login to Admin Dashboard.</p>

        <Form layout="vertical" className="space-y-4" onFinish={onFinish}>
          <Form.Item label={<span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Email</span>} name="email">
            <Input type="text" placeholder="Username" className="w-[100px] h-[50px] p-3 bg-white/10 text-white placeholder-white border border-white/20" />
          </Form.Item>
          <Form.Item label={<span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Password</span>} name="password">
            <Input.Password placeholder="Password" className="w-[100px] h-[50px] p-3 bg-white/10 text-white placeholder-white border border-white/20" />
          </Form.Item>
          <Form.Item>
            <button type="primary" htmlType="submit" className="w-full p-3 bg-primary hover:bg-white rounded text-white hover:text-primary font-bold uppercase">
              Login
            </button>
          </Form.Item>
        </Form>

        <p className="mt-4 text-sm text-center tracking-wide uppercase text-white/70">Forgotten your password?</p>
      </div>
    </div>
  );
};

export default Login;
