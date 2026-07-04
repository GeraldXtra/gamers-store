import { useState, useEffect, useRef } from "react";
import PS5Img from "./../../../assets/Sony_PS5_DualSense_Edge_Wireless_Controller.png";
import cpuImg from "./../../../assets/cpu.png";
import gtximg from "./../../../assets/Gigabyte_GeForce_GTX_1080_Ti_11GB_AORUS_XTREME_Waterforce_WB.png";
import mouseImg from "./../../../assets/mouse.png";
import keyboardImg from "./../../../assets/keyboard.png";

const slides = [
  {
    id: 1,
    title: "New Controller",
    subtitle: "Sony PS5 DualSense Edge Wireless Controller",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: PS5Img,
  },
  {
    id: 2,
    title: "Latest GTX-Ti Graphic Card",
    subtitle: "Gigabyte GeForce GTX 1080 Ti 11GB AORUS XTREME Waterforce WB",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: gtximg,
  },
  {
    id: 3,
    title: "The Best Processor",
    subtitle: "Skytech King 95 Gaming PC Desktop AMD Ryzen 7 9800X3D NVIDIA GeForce RTX 5070 1TB Gen4 NVMe SSD 32GB DDR5 RAM, AIO Liquid Cooling Windows 11",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    image: cpuImg,
  },
  { id: 4, title: "Mechanical Keyboard", subtitle: "Gaming Keyboard", ctaText: "Shop Now", ctaLink: "/shop", keyboardImg },
  { id: 5, title: "Carbon Black Optical Mouse", subtitle: "Gaming mouse", ctaText: "SHop Now", ctaLink: "/shop", image: mouseImg },
];

const categories = [
  { id: 1, label: "Gaming Computer", icon: "bi-laptop" },
  { id: 2, label: "Headphones", icon: "bi-headphones" },
  { id: 3, label: "Graphic Cards", icon: "bi-nvidia" },
  { id: 4, label: "Playstations", icon: "bi-controller" },
  { id: 5, label: "XBox", icon: "bi-xbox" },
  { id: 6, label: "Gaming Keyboard", icon: "bi-keyboard" },
  { id: 7, label: "Gaming Mouse", icon: "bi-mouse" },
  { id: 8, label: "Mouse Pad", icon: "bi-square" },
];

const Hero = () => {
  return <></>;
};

export default Hero;
