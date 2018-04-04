const { expect } = require('chai');
const Validator = require('./validator');

describe("Validator", () => {
  var subject;
  var validData;

  beforeEach(() => {
    subject = Validator;
    validData = {
      name: "Bob",
      email: "bob@gmail.com",
      message: "hello"
    }
  })

  describe("#validate", () => {
    // given
    context("when name is blank", () => {
      it("adds an error", () => {
        // given
        validData.name = '';

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);
        expect(errors[0]).to.eq("Name is required");
      })
    });

    context("when name exceeds char limit", () => {
      it("adds an error", () => {
        // given
        validData.name = "x".repeat(256);

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);
        expect(errors[0]).to.eq("Name cannot exceed 255 characters");
      })
    })

    context("when email is blank", () => {
      it("adds an error", () => {
        // given
        validData.email = '';

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);
        expect(errors[0]).to.eq("Email is required");
      })
    });

    context("when email exceeds char limit", () => {
      it("adds an error", () => {
        // given
        validData.email = "x".repeat(255) + "@gmail.com";

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);

        expect(errors).to.include("Email cannot exceed 254 characters");
      })
    })

    context("when email is invalid", () => {
      it("adds an error", () => {
        // given
        validData.email = "@gmail.com";

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);

        expect(errors).to.include("Email is invalid");
      })
    })

    context("when message is blank", () => {
      it("adds an error", () => {
        // given
        validData.message = '';

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);
        expect(errors[0]).to.eq("Message is required");
      })
    });

    context("when message exceeds char limit", () => {
      it("adds an error", () => {
        // given
        validData.message = "x".repeat(10001);

        // when
        let errors = subject.validate(validData);

        // expect
        expect(errors).to.have.lengthOf(1);
        expect(errors[0]).to.eq("Message cannot exceed 1000 characters");
      })
    })
  });


})
