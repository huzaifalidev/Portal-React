import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const GlobalLoader: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        opacity: 0.8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
        size="large"
      />
    </div>
  );
};

export default GlobalLoader;
