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
  constructor(readonly username: string, readonly comment: string) {
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
  ol.classList.add("comments-container__list");
  model.comments
    .map(userComment => {
      const li: HTMLLIElement = document.createElement("li");
      li.classList.add("comments__item");
      li.classList.add("comment");
      const commentParagraph: HTMLParagraphElement = document.createElement(
        "p"
      );
      const signature: HTMLParagraphElement = document.createElement("p");
      signature.classList.add("comment__signature");
      li.appendChild(commentParagraph);
      li.appendChild(signature);
      commentParagraph.innerHTML = userComment.comment;
      signature.textContent = userComment.username;
      return li;
    })
    .forEach(li => ol.appendChild(li));
  const commentsContainer: HTMLElement | null = document.querySelector(
    ".comments-container"
  );
  if (commentsContainer != null) {
    const list: HTMLOListElement | null = commentsContainer.querySelector(
      ".comments-container__list"
    );
    if (list == null) {
      commentsContainer.appendChild(ol);
    } else {
      commentsContainer.replaceChild(ol, list);
    }
  }
};

const resetForm = (form: HTMLFormElement): void => {
  form.reset();
  for (let i = 0, len = form.elements.length; i < len; i++) {
    const element = form.elements.item(i);
    if (element.getAttribute("name") === "username") {
      (<HTMLInputElement>element).focus();
    }
  }
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
  resetForm(form);
};

window.submitComment = submitComment;
