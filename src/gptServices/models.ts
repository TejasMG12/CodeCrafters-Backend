import ChatBot from "./chatBot";

export const getTopicsFromSinglePage = new ChatBot<string[]>(
    [
      {
        "role": "system",
        "content": "You are a helper for students which extracts important topics from the given paragraph. Give the list of topics and subtopics\nThe ouput should be in json  array: [{\"topicTitle\" : ''\", \"subTopics\" : ['Strings\"]}, ....]\nNot more than 5\nExample :\n[{\"topicTitle\": \"Underwater Acoustic Classification\", \"subTopics\": [\"Challenging Problem\", \"Background Noise\", \"Sound Propagation Patterns\", \"Ship Classification\", \"Dataset Research\"]}, {\"topicTitle\": \"DeepShip Dataset\", \"subTopics\": [\"Construction of Dataset\", \"Real-world Recordings\", \"Different Ship Classes\", \"Sea States and Noise Levels\"]}, {\"topicTitle\": \"Machine Learning and Deep Learning Algorithms\", \"subTopics\": [\"Comprehensive Study\", \"Time Frequency-based Features\", \"Proposed Separable Convolution-based Autoencoder Network\", \"Classification Accuracy\"]}, {\"topicTitle\": \"Underwater Acoustic Classification Applications\", \"subTopics\": [\"Detection of Marine Vessels\", \"Environmental Impact Assessment\", \"Vessel Design and Marine Life Classification\"]}, {\"topicTitle\": \"Challenges in Underwater Acoustic Classification\", \"subTopics\": [\"Complex Underwater Environment\", \"Frequency-dependent Absorption and Scattering of Sound\", \"Unavailability of Appropriate Size Real-world Dataset\"]}]"
      }
    ],
    (data: any) => {
      return JSON.parse(data);
    },
    true,
    'gpt-3.5-turbo'
  );


export const combineMultipleTopics = new ChatBot<string[]>(
  [
    {
      "role" : "system",
      "content": "You are a fast summarizer which find combines list of similar looking topics and generate list using the given list of topics by removing duplicates and making it crips and concise. Output in JSON\nexample output:\n[{\"topicTitle\": \"Underwater Acoustic Classification\", \"subTopics\": [\"Challenging Problem\", \"Background Noise\", \"Sound Propagation Patterns\", \"Ship Classification\", \"Dataset Research\"]}, {\"topicTitle\": \"DeepShip Dataset\", \"subTopics\": [\"Construction of Dataset\", \"Real-world Recordings\", \"Different Ship Classes\", \"Sea States and Noise Levels\"]}, {\"topicTitle\": \"Machine Learning and Deep Learning Algorithms\", \"subTopics\": [\"Comprehensive Study\", \"Time Frequency-based Features\", \"Proposed Separable Convolution-based Autoencoder Network\", \"Classification Accuracy\"]}]"
    }
  ],
  (data: any) => {
    return JSON.parse(data);
  },
  true,
  'gpt-3.5-turbo'
);


export const questionGenerator = new ChatBot<string[]>(
  [
    {
      "role" : "system",
      "content": "You are a tutor and generate relavant questions from the given paragarph focusing the given topics. Generate not more than 5  Multiple Choise questions and descriptions based question. Must Generate a JSON response \ncontaining Question, type and options\nInputFormat:[\"Paragraph\" : [\"someParagraph\",\"someParagraph\"]\nTopic : Challenges in underwater acoustic classification\nexample:\n[\n  {\n    \"question\": \"What are the challenges in underwater acoustic classification?\",\n    \"typeOfQuestion\": \"Multiple Choice\",\n    \"answer\": {\n      \"option\": \"d\",\n      \"explanation\": \"All of the above\"\n    }\n  },\n  {\n    \"question\": \"Which dataset is the largest publicly available dataset for underwater audio?\",\n    \"typeOfQuestion\": \"Fill in the Blank\",\n    \"answer\": \"DeepShip dataset\"\n  }\n]"
    },
  ],
    (data:any) => {
      return JSON.parse(data);
    },
    true,
    'gpt-3.5-turbo'
);