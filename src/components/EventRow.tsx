
import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>
        {event.date} - {event.location}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  details: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
});
