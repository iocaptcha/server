import axios from 'axios';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const CONFIG = {
    api_base_url: 'https://eu-prod.iocaptcha.com/api/v1',
    timeout: 10000,
    proxy: null
};
class Api {
    constructor(config) {
        this.config = config;
        this.http = axios.create({
            baseURL: CONFIG.api_base_url,
            timeout: CONFIG.timeout,
            proxy: CONFIG.proxy
        });
    }
    /**
     * Try to authenticate yourself with the API.
     * Recommended to run this on startup, to check whether your configuration is correct.
     */
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post('/auth/endpoint', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Endpoint-Public-Key': this.config.endpoint_public_key,
                    'X-Endpoint-Private-Key': this.config.endpoint_private_key
                }
            });
            if (response.status !== 200) {
                console.warn('Authentication failed. Please check your endpoint keys.\n', response.data);
            }
            return response.status === 200;
        });
    }
    /**
     *
     * @param data - The ScoreRequest interface, or pass_uuid.
     */
    validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data === 'string') {
                data = {
                    pass_uuid: data,
                    invalidate: true
                };
            }
            const response = yield this.http.post('/score', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Endpoint-Public-Key': this.config.endpoint_public_key,
                    'X-Endpoint-Private-Key': this.config.endpoint_private_key
                }
            });
            return response.data;
        });
    }
}

export { Api, CONFIG };
