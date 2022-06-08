const Table = ({ children, header }) => {
    return (
        <table className="table table-striped">
            {header}
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
