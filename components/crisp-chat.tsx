"use client";
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5d32e4c4-22b6-4bfb-83f4-17939cc20cc2");
  },[]);
  return null;
};
