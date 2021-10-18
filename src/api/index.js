import axios from "axios";
import qs from "qs";

let cid = 1;
const ERROR_MSG_MAP = {
	404: "资源未找到",
	502: "服务端出错",
	504: "响应超时",
};

// axios默认是application/x-www-form-urlencoded,这里修改成application/json
axios.defaults.headers["Content-Type"] = "application/json";

const axiosInstance = axios.create({
	timeout: 3000,
	transformRequest: [
		function(data, header) {
			let ret = data;
			if (header["Content-Type"] === "application/x-www-form-urlencoded") {
				ret = qs.stringify(data);
			}

			if (header["Content-Type"] === "application/json") {
				ret = JSON.stringify(data);
			}
			return ret;
		},
	],
	adapter: (config) => {
		if (config.dataType === "jsonp") {
			const ret = handleJsonp(config);
			return ret;
		}
	},
});

// 对返回状态的处理
axiosInstance.interceptors.response.use(
	(resp) => resp,
	(error) => {
		const { response: { status } = {} } = error;
		const msg = status ? ERROR_MSG_MAP[status] : "失败";
	}
);

/**
 * @desc 处理jsonp类型请求
 * @param config.callbackParamName  设置jsonp的callback名称, 默认是callback
 * 
 */
function handleJsonp(config) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement("script");
		var src = config.url;
		function buildParams(params) {
			var result = [];

			for (var i in params) {
				result.push(
					encodeURIComponent(i) + "=" + encodeURIComponent(params[i])
				);
			}

			return result.join("&");
		}

		if (config.params) {
			var params = buildParams(config.params);

			if (params) {
				src += (src.indexOf("?") >= 0 ? "&" : "?") + params;
			}
		}

		script.async = true;

		var jsonp = "axiosJsonpCallback" + cid++;
		var old = window[jsonp];
		var isAbort = false;

		window[jsonp] = function(responseData) {
			window[jsonp] = old;

			if (isAbort) {
				return;
			}

			var response = {
				data: responseData,
				status: 200,
			};

			resolve(response);
		};

		var additionalParams = {
			_: new Date().getTime(),
		};

		additionalParams[config.callbackParamName || "callback"] = jsonp;

		src += (src.indexOf("?") >= 0 ? "&" : "?") + buildParams(additionalParams);

		function remove() {
			if (script) {
				script.onload = script.onreadystatechange = script.onerror = null;

				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

				script = null;
			}
		}

		script.onload = script.onreadystatechange = function() {
			if (!script.readyState || /loaded|complete/.test(script.readyState)) {
				remove();
			}
		};

		script.onerror = function() {
			remove();

			reject(new Error("Network Error"));
		};

		if (config.cancelToken) {
			config.cancelToken.promise.then(function(cancel) {
				if (!script) {
					return;
				}

				isAbort = true;

				reject(cancel);
			});
		}

		script.src = src;

		document.head.appendChild(script);
	});
}

export default axiosInstance;
