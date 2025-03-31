import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/" className="text-gray-500 hover:text-blue-500">Home</Link>
        </Breadcrumb.Item>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <Breadcrumb.Item key={routeTo}>
              {isLast ? (
                <span className="font-semibold">{decodeURIComponent(value)}</span>
              ) : (
                <Link to={routeTo} className="text-gray-500 hover:text-blue-500">
                  {decodeURIComponent(value)}
                </Link>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
