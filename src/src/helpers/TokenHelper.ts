import {getCookie} from "@/helpers/CookieHelper";

export  function  getToken():string
{
    return getCookie("access_token");
}