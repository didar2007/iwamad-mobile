
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((item) => item.id === id);

  if (!event) {
  return (
    <View style={styles.container}>
      <Text>Event not found</Text>
      <Text>No event with id {id}</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Time: {event.time}</Text>
      <Text>Location: {event.location}</Text>
      <Text>{event.description}</Text>
      <Text>Available seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
