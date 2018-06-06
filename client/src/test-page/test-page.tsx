import * as React from "react";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { userMock } from "../group/expense-mocks";

export interface TestPageState {
  modalVisible: boolean;
}

export class TestPage extends React.Component<{}, TestPageState> {
  constructor() {
    super({});
    this.state = {
      modalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  render() {
    return (
      <div>
        <Header username={userMock.username} />
        <button onClick={this.toggleModal}>Show Modal</button>
        <Modal
          title="This is the modal title."
          visible={this.state.modalVisible}
          onCancel={this.toggleModal}
        >
          This is some text in the modal
        </Modal>
      </div>
    );
  }
}
