
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const toggleSaved = (id: string) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.savedText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredEvents.length === 0 ? (
        <Text style={styles.empty}>No events match</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <EventRow
              event={item}
              onPress={() => router.push(`/events/${item.id}`)}
              onLongPress={() => toggleSaved(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  savedText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333333',
  },
  search: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666666',
  },
});
