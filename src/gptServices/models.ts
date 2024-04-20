import ChatBot from "./chatBot";

export const getTopicsFromSinglePage = new ChatBot<string[]>(
    [
      {
        "role": "system",
        "content": "You are a helper for students which extracts topcs from the given paragraph. Give the list of topics and subtopics\nExample: \n1.0 DeepShip: An underwater acoustic benchmark dataset and separable convolution based autoencoder for classification\n   1.1 Introduction\n   1.2 Underwater acoustic classification challenges\n   1.3 Need for publicly available underwater acoustic datasets\n   1.4 Construction of the DeepShip dataset\n   1.5 Purpose of the DeepShip dataset\n2.0 Factors influencing underwater acoustic classification\n   2.1 Mode of operation\n   2.2 Recording equipment\n   2.3 Area and underwater environmental conditions\n   2.4 Nature of signatures of military ships\n3.0 Applications of underwater acoustic classification\n   3.1 Marine vessel classification and detection\n   3.2 Environmental impact assessment of vessel noise\n   3.3 Vessel design improvement\n   3.4 Marine life classification\n4.0 Challenges in underwater acoustic classification\n   4.1 Complex underwater environment\n   4.2 Background noise\n   4.3 Frequency-dependent absorption and scattering of sound data\n   4.4 Advancements in propeller engine and stealth hull technology\n5.0 Contribution of the DeepShip dataset\n   5.1 Training and evaluation of different algorithms\n   "
      }
    ],
    (data: any) => {
    console.log("data", data);
      return JSON.parse(data).questions;
    },
    true,
    'gpt-3.5-turbo'
  );
