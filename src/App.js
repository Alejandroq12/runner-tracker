import { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value })
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // URL of image to use. Change this to your image.
    const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    const raw = JSON.stringify({
      user_app_id: {
        user_id: 'clarifai',
        app_id: 'main',
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
        Authorization: 'Key ' + 'eb4da108907e425c9b10c1897fffaa99',
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
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
