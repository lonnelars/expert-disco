declare global {
  interface Window {
    submitComment: (form: HTMLFormElement) => void;
  }
}

interface FormElements extends HTMLCollection {
  username: HTMLInputElement;
  comment: HTMLInputElement;
}

class UserComment {
  readonly username: string;
  readonly comment: string;

  constructor(username: string, comment: string) {
    this.username = username;
    this.comment = comment;
  }
}

interface Model {
  comments: UserComment[];
}

let model: Model = {
  comments: []
};

const updateView = (model: Model): void => {
  const ol: HTMLOListElement = document.createElement("ol");
  ol.classList.add("comment-list");
  model.comments
    .map(userComment => {
      const li: HTMLLIElement = document.createElement("li");
      li.classList.add("comment");
      const commentParagraph: HTMLParagraphElement = document.createElement(
        "p"
      );
      const signature: HTMLParagraphElement = document.createElement("p");
      li.appendChild(commentParagraph);
      li.appendChild(signature);
      commentParagraph.innerHTML = userComment.comment;
      signature.textContent = userComment.username;
      return li;
    })
    .forEach(li => ol.appendChild(li));
  const commentList: HTMLOListElement | null = document.querySelector(
    "ol.comment-list"
  );
  if (commentList != null) {
    commentList.remove();
  }
  document.body.appendChild(ol);
};

export const submitComment = (form: HTMLFormElement): void => {
  const elements: FormElements = form.elements as FormElements;
  const username = elements.username.value;
  const comment = elements.comment.value;

  model = {
    ...model,
    comments: model.comments.concat(new UserComment(username, comment))
  };

  updateView(model);
};

window.submitComment = submitComment;
