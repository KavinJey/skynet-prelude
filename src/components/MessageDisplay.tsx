//  @ts-nocheck
// TODO: make typesafe
import { Segment, Message, Transition, Rail } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useState, useEffect } from "react";

const MessageList = ({ messages, dismissMessage }) => {
  const messageItems = messages.map(({ message, negative, dismissed, id }) => {
    return (
      <div key={id}>
        <Transition animation="fade up" duration={500} visible={!dismissed}>
          <Message
            onDismiss={() => dismissMessage({ id })}
            floating
            negative={negative}
          >
            <p> {message} </p>
          </Message>
        </Transition>
      </div>
    );
  });

  return <>{messageItems}</>;
};

const MessageDisplay = () => {
  const { error, messages } = useStoreState((state) => state.ui);
  const { dismissMessage } = useStoreActions((actions) => actions.ui);
  const [, setVisible] = useState(false);
  const [, setErrorText] = useState("Default Error Text");

  useEffect(() => {
    if (error) {
      setErrorText(error);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [error]);

  return (
    <Rail internal position="right">
      <Segment basic style={{ marginTop: "70px" }} />
      <MessageList messages={messages} dismissMessage={dismissMessage} />
    </Rail>
  );
};

export default MessageDisplay;
