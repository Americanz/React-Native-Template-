
import { request } from "../request";
import * as apiTypes from "../../types/apiTypes";

export function checkForChanges(params?: apiTypes.SearchParams) {
    return request<apiTypes.ListResponse>({
      url: "/sync/changes",
      method: "get",
      params,
    });
  }
