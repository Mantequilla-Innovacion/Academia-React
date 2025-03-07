import React, { useState, useEffect } from 'react';
import ArticleModal from './Modal';
import ArticleList from './List';

export default function Articles({ localUser, articles, data, setArticles }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const openModal = (task) => {
    setSelectedArticle(task);
    setModalVisible(true);
  };

  return (
    <div>
      <ArticleList
        articles={articles}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        openModal={openModal}
        data={data}
      />
      <ArticleModal
        onClose={(data = null)}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedArticle={selectedArticle}
        localUser={localUser}
        setArticles={setArticles}
        setSelectedArticle={setSelectedArticle}
      />
    </div>
  );
}
