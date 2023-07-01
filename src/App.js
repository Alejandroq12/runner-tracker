import { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'eb4da108907e425c9b10c1897fffaa99';
  const USER_ID = 'aleq12';
  const APP_ID = 'my-first-application-eye2ra';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      returnClarifaiRequestOptions(this.state.input)
    )
      .then(response => response.json())
      .then(data => {
        this.calculateFaceLocation(data);
    })
    .catch((error) => console.error('Error:', error));
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg num={80} type="lines" bg />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
