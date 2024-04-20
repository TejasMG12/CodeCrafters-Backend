import { OPENAI_KEY } from '@/config';
import { OpenAI } from 'openai';
import { ChatCompletionCreateParamsNonStreaming, CreateChatCompletionRequestMessage } from 'openai/resources/chat';


class ChatBot<T> {
  private openai: OpenAI;
  public prompt: CreateChatCompletionRequestMessage[];
  private parser: Function;
  private model = 'gpt-3.5-turbo';
  private json = false;
  constructor(prompt: CreateChatCompletionRequestMessage[], Decompressor: Function, json?: boolean, model?: string) {
    this.openai = new OpenAI({
      apiKey: OPENAI_KEY,
      timeout: 30000,
    });
    this.prompt = prompt;
    this.parser = Decompressor;
    if (model) {
      this.model = model;
    }
    this.json = json ? true : false;
  }

  public async getChatResponse(prompt: string): Promise<T> {
    const req = [...this.prompt];
    req.push({
      role: 'user',
      content: prompt,
    });

    console.log(req);

    const options: ChatCompletionCreateParamsNonStreaming = {
      model: this.model,
      messages: req,
      temperature: 0.4,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    this.json ? (options['response_format'] = { type: 'json_object' }) : null;

    const response: any = await this.openai.chat.completions.create({
      ...options,
    });

    if (response.choices[0].message.content) {
      try {
        console.log(response.choices[0].message.content);
        return this.parser(response.choices[0].message.content) as T;
      } catch (e) {
        console.log(e);
        return [] as unknown as T;
      }
    }
    throw new Error('No response from GPT-3');
  }
}

export default ChatBot;
