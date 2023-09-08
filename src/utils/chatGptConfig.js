import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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'
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

export default openai;
