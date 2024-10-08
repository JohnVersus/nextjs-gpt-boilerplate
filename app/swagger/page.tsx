"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "../../styles/swagger.css";
import { OpenAPIV1 } from "../api/swagger/swagger";

const SwaggerPage = () => (
  <SwaggerUI spec={OpenAPIV1} displayOperationId={false} />
);

export default SwaggerPage;
