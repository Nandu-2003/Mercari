import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
  register,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "@/config/api";
import Ionicons from '@expo/vector-icons/Ionicons';

register();

// Type definition for component props
interface JoinScreenProps {
  getMeetingId: (id?: string) => void;
}

// Type definition for ParticipantView component props
interface ParticipantViewProps {
  participantId: string;
}

// Type definition for ParticipantList component props
interface ParticipantListProps {
  participants: string[];
}

// JoinScreen component
function JoinScreen({ getMeetingId }: JoinScreenProps) {
  const [meetingVal, setMeetingVal] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => getMeetingId()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create Meeting</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>---------- OR ----------</Text>

      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder="XXXX-XXXX-XXXX"
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, { marginTop: 14 }]}
        onPress={() => getMeetingId(meetingVal)}
      >
        <Text style={styles.buttonText}>Join Meeting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Button component with Ionicons
const Button = ({
  onPress,
  iconName,
  buttonText,
  backgroundColor,
}: {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  buttonText: string;
  backgroundColor: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.iconButton, { backgroundColor }]}
  >
    <Ionicons name={iconName} size={24} color="white" />
    <Text style={styles.iconText}>{buttonText}</Text>
  </TouchableOpacity>
);

// ParticipantView component
function ParticipantView({ participantId }: ParticipantViewProps) {
  const { webcamStream, webcamOn } = useParticipant(participantId);

  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream?.track]).toURL()}
      objectFit="cover"
      style={styles.rtcView}
    />
  ) : (
    <View style={styles.noMediaView}>
      <Text style={styles.noMediaText}>NO MEDIA</Text>
    </View>
  );
}

// ParticipantList component
function ParticipantList({ participants }: ParticipantListProps) {
  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({ item }) => <ParticipantView participantId={item} />}
    />
  ) : (
    <View style={styles.centeredView}>
      <Text style={styles.noParticipantText}>
        Press Join button to enter meeting.
      </Text>
    </View>
  );
}

// ControlsContainer component with Ionicons
function ControlsContainer() {
  const {
    join,
    leave,
    toggleWebcam,
    toggleMic,
    toggleScreenShare,
  } = useMeeting();

  return (
    <View style={styles.controlsContainer}>
      <Button onPress={() => join()} iconName="log-in" buttonText="Join" backgroundColor="#1178F8" />
      <Button onPress={() => toggleWebcam()} iconName="camera" buttonText="Webcam" backgroundColor="#1178F8" />
      <Button onPress={() => toggleMic()} iconName="mic" buttonText="Mic" backgroundColor="#1178F8" />
      <Button onPress={() => leave()} iconName="log-out" buttonText="Leave" backgroundColor="#FF0000" />
      <Button onPress={() => toggleScreenShare()} iconName="desktop-outline" buttonText="Share" backgroundColor="#1178F8" />
    </View>
  );
}

// PresenterView component
function PresenterView({ presenterId }: { presenterId: string }) {
  const { screenShareStream, screenShareOn } = useParticipant(presenterId);
  return (
    <>
      {screenShareOn && screenShareStream ? (
        <RTCView
          streamURL={new MediaStream([screenShareStream.track]).toURL()}
          objectFit="cover"
          style={styles.flexView}
        />
      ) : null}
    </>
  );
}

// Main MeetingView component
function MeetingView() {
  const { participants, meetingId, presenterId } = useMeeting({});
  const { screenShareStream, screenShareOn } = useParticipant(presenterId);

  const participantsArrId = Array.from(participants.keys());

  return (
    <View style={styles.flexView}>
      {meetingId && <Text style={styles.meetingIdText}>Meeting Id: {meetingId}</Text>}
      {screenShareOn && screenShareStream ? (
        <PresenterView presenterId={presenterId} />
      ) : (
        <ParticipantList participants={participantsArrId} />
      )}
      <ControlsContainer />
    </View>
  );
}

// Main component
const Inbox: React.FC = () => {
  const [meetingID, setMeetingID] = useState<string | null>(null);

  const getMeetingId = async (id?: string) => {
    if (!token) {
      console.log("PLEASE ADD YOUR TOKEN in api.js");
      return;
    }
    const newMeetingId = id || (await createMeeting({ token }));
    setMeetingID(newMeetingId);
  };

  return meetingID ? (
    <SafeAreaView style={styles.flexView}>
      <MeetingProvider
        config={{
          meetingId: meetingID,
          micEnabled: true,
          webcamEnabled: true,
          name: "John Doe",
        }}
        token={token}
      >
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6FF",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  button: {
    backgroundColor: "#1178F8",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
  iconButton: {
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  orText: {
    alignSelf: "center",
    fontSize: 22,
    marginVertical: 16,
    fontStyle: "italic",
    color: "grey",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    fontStyle: "italic",
  },
  rtcView: {
    height: 300,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  noMediaView: {
    backgroundColor: "grey",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  noMediaText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#F6F6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  noParticipantText: {
    fontSize: 20,
  },
  controlsContainer: {
    padding: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexView: {
    flex: 1,
  },
  meetingIdText: {
    fontSize: 18,
    padding: 12,
  },
});

export default Inbox;
