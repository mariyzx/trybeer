import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, getProductById, updateOrderStatus } from '../services/api';
import { SellerDetails } from '../styles/components/SellerCard';
import TableCheckout from '../styles/components/Table';
import { Total } from '../styles/pages/Checkout';

function SellerOrderDetailsTable() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState();
  const [preparingButton, setPreparingButton] = useState();
  const [dispatchButton, setDispatchButton] = useState();
  const { id } = useParams();
  // const array = [];

  const dataTest = (name, index) => {
    const data = `seller_order_details__element-order-table-${name}-${index}`;
    return data;
  };

  const dataTestId = (name) => {
    const data = `seller_order_details__element-order-details-label-${name}`;
    return data;
  };

  const formatDate = (date) => {
    const result = new Date(Date.parse(date));
    return result.toLocaleDateString('pt-BR');
  };

  const checkStatus = (status) => {
    setPreparingButton(status !== 'Pendente');
    setDispatchButton(status !== 'Preparando' || status === 'Em Trânsito');
  };

  const updateStatus = async (event) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    let newStatus;

    if (event.target.name === 'preparing') {
      newStatus = 'Preparando';
    } else if (event.target.name === 'dispatch') {
      newStatus = 'Em Trânsito';
    }

    await updateOrderStatus(id, newStatus, token);
    const result = await getOrderById(id, token);
    checkStatus(result.sale.status);
    setOrderDetails(result.sale);
  };

  const getAllProducts = useCallback(async (product) => {
    const allProducts = await getProductById(product.productId);
    setProductsList(
      (prevState) => [...prevState, { ...allProducts, quantity: product.quantity }],
    );
  }, []);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const getOrder = async () => {
      const result = await getOrderById(id, token);
      checkStatus(result.sale.status);
      setOrderDetails(result.sale);
      setProductsList([]);
      result.saleProduct.forEach((product) => getAllProducts(product));
      setFormattedPrice(result.sale.totalPrice.replace('.', ','));
    };
    getOrder();
  }, [getAllProducts, id]);

  return (
    <SellerDetails>
      <h1>Detalhe Pedido</h1>
      {productsList.length === 0 ? <p>Nenhum pedido cadastrado</p> : (
        <TableCheckout>
          <thead>
            <tr>
              <th
                data-testid={ dataTestId('order-id') }
              >
                {`PEDIDO Nº 00${orderDetails.id}`}
              </th>
              <th
                data-testid={ dataTestId('seller-name') }
              >
                P. Vend: Fulana Pereira
              </th>
              <th
                data-testid={ dataTestId('order-date') }
              >
                {formatDate(orderDetails.saleDate)}
              </th>
              <th
                data-testid={ dataTestId('delivery-status') }
              >
                {orderDetails.status}
              </th>
              <th>
                <button
                  onClick={ updateStatus }
                  type="button"
                  data-testid="seller_order_details__button-preparing-check"
                  name="preparing"
                  disabled={ preparingButton }
                >
                  Preparar pedido
                </button>
              </th>
              <th>
                <button
                  onClick={ updateStatus }
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                  name="dispatch"
                  disabled={ dispatchButton }
                >
                  Saiu para entrega
                </button>
              </th>
            </tr>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={ dataTest('item-number', index) }
                >
                  {Number(index + 1)}
                </td>
                <td
                  data-testid={ dataTest('name', index) }
                >
                  {product.name}
                </td>
                <td
                  data-testid={ dataTest('quantity', index) }
                >
                  {product.quantity}
                </td>
                <td
                  data-testid={ dataTest('unit-price', index) }
                >
                  {(product.price).replace('.', ',')}
                </td>
                <td
                  data-testid={ dataTest('sub-total', index) }
                >
                  {(product.price * product.quantity).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            ))}
          </tbody>
        </TableCheckout>
      )}
      <Total
        data-testid="seller_order_details__element-order-total-price"
      >
        Total:
        {' '}
        {formattedPrice}
      </Total>
    </SellerDetails>
  );
}

export default SellerOrderDetailsTable;
