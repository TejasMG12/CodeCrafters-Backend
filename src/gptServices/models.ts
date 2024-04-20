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
