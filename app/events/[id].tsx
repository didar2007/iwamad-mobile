
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error } = useEvents();

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>Loading events...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Could not load events: {error.message}</Text>
      </View>
    );
  }

  const event = data.find((item) => item.id === Number(id));

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
