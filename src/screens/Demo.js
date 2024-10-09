import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import Sound from 'react-native-sound';

const Demo = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load sound from the 'raw' folder for Android
    const audio = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      console.log('Sound loaded successfully');
      console.log('Duration:', audio.getDuration()); // Log sound duration if needed
      setSound(audio);
    });

    // Clean up sound when component unmounts
    return () => {
      if (audio) {
        audio.release();
      }
    };
  }, []);

  const playSound = () => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          console.log('Successfully finished playing');
          setIsPlaying(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
      setIsPlaying(true);
    }
  };

  const pauseSound = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => setIsPlaying(false));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={isPlaying ? pauseSound : playSound} />
      <Button title="Stop" onPress={stopSound} />
    </View>
  );
};

export default Demo;
