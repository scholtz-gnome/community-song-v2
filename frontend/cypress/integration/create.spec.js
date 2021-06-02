/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

context("Create", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.visit("http://localhost:3000/create");
    Cypress.Cookies.preserveOnce("CSRF-TOKEN", "remember_token");
    Cypress.Cookies.preserveOnce("_csrf", "remember_token");
  });

  context("When song is created with one file", () => {
    it("creates song and uploads file", () => {
      const songTitle = "Octavarium";
      const altSongTitle = "Song of 8";
      const songArtist = "Dream Theater";

      cy.get("[cypress-test = 'create-song-title-input']")
        .type(songTitle)
        .should("have.value", songTitle);
      cy.get("[cypress-test = 'create-song-alternate-title-input']")
        .type(altSongTitle)
        .should("have.value", altSongTitle);
      cy.get("[cypress-test = 'create-song-artist-input']")
        .type(songArtist)
        .should("have.value", songArtist);

      cy.get("[cypress-test = 'create-song-add-file-input']")
        .attachFile("empty.pdf")
        .trigger("input", { target: undefined, force: true });

      cy.get("[cypress-test='file-items-file-name-input']").type(
        "{selectall}Non-Empty File"
      );

      cy.get("[cypress-test = 'file-items-select-type']").select(
        "chords and lyrics"
      );

      cy.intercept("http://localhost:4000/songs/*/files").as("postSongsFiles");

      cy.get("[cypress-test='create-song-submit']").click();

      cy.get("[cypress-test='create-song-success-message']").contains(
        "Nearly there..."
      );

      cy.wait("@postSongsFiles").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });

      cy.get("[cypress-test='create-song-success-message']").contains(
        "Octavarium created"
      );
    });
  });

  context("When song is created with 2 files", () => {
    it("creates song and uploads files", () => {
      const songTitle = "The Dance of Eternity";
      const altSongTitle = "Insane Time";
      const songArtist = "Dream Theater";

      cy.get("[cypress-test = 'create-song-title-input']")
        .type(songTitle)
        .should("have.value", songTitle);
      cy.get("[cypress-test = 'create-song-alternate-title-input']")
        .type(altSongTitle)
        .should("have.value", altSongTitle);
      cy.get("[cypress-test = 'create-song-artist-input']")
        .type(songArtist)
        .should("have.value", songArtist);

      cy.get("[cypress-test = 'create-song-add-file-input']")
        .attachFile("empty.pdf")
        .trigger("input", { target: undefined, force: true });

      cy.get("[cypress-test = 'create-song-add-file-input']")
        .attachFile("second.pdf")
        .trigger("input", { target: undefined, force: true });

      cy.get(":nth-child(1) > :nth-child(2) > #file-type-select").select(
        "bass tabs"
      );
      cy.get(":nth-child(2) > :nth-child(2) > #file-type-select").select(
        "lyrics"
      );

      cy.intercept("POST", "http://localhost:4000/songs/*/file-collections").as(
        "postSongsFileCollections"
      );
      cy.get("[cypress-test='create-song-submit']").click();

      cy.get("[cypress-test='create-song-success-message']").contains(
        "Nearly there..."
      );

      cy.wait("@postSongsFileCollections").then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });

      cy.get("[cypress-test='create-song-success-message']").contains(
        "The Dance of Eternity created"
      );
    });
  });
});
