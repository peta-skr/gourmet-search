describe("test", () => {
  it("test1", () => {
    //検索
    cy.visit("http://localhost:3000/");
    cy.get(".select").click({
      multiple: true,
    });
    cy.get("#def").click({
      multiple: true,
    });
    //ページネーション
    cy.get(".search").click({ multiple: true });
    cy.get("#pagenation").contains("2").click({ multiple: true });
    //詳細ページ
    cy.get("#shop-name").click({ multiple: true });
    //詳細ページリロード
    cy.reload();
    //戻るボタン
    cy.get("#back").click({ multiple: true });
    //検索結果ページリロード
    cy.reload();
    //ホームボタン
    cy.get("#home").click({ multiple: true });
    //404ページ
    cy.visit("http://localhost:3000/test");
  });
});
