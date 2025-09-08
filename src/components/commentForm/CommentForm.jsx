"use client";

 function CommentForm({ newComment, setNewComment, onSubmit }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold mb-2">댓글달기</h3>
      <textarea
        placeholder="댓글을 입력해주세요."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full h-[104px] bg-gray-100 p-4 rounded-lg resize-none focus:outline-none mb-2"
      />
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
        >
          등록
        </button>
      </div>
    </div>
  );
}
export default CommentForm