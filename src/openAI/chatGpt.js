import openai from '../utils/chatGptConfig';

const textGeneratorChatGpt = async (prompt) => {
    try {
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        };
        const response = await openai.createChatCompletion(data);
        // console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error)
    }
};

export default textGeneratorChatGpt;
