import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();
  const { savedIds, toggleSaved } = useSavedIds();
  const [search, setSearch] = useState('');

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEvents();

  const filteredEvents = (data ?? []).filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isPending) {
    return (
      <View style={styles.center}>
        <Text>Loading events...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>
          Could not load events: {error.message}
        </Text>
        <Pressable onPress={() => refetch()}>
          <Text style={styles.retry}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isRefetching && <ActivityIndicator />}

      <Text style={styles.savedText}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
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
          refreshing={isRefetching}
          onRefresh={() => refetch()}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <EventRow
              event={item}
              saved={savedIds.includes(Number(item.id))}
              onPress={() => router.push(`/events/${item.id}`)}
              onToggleSaved={() => toggleSaved(Number(item.id))}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  retry: {
    color: 'blue',
    marginTop: 12,
    fontSize: 16,
  },
});