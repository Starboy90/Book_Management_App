import type { Book, NewBook } from "../types/book";

const API_BASE = import.meta.env.VITE_API_BASE;

async function handleRes<T>(res : Response): Promise<T> {
    if(!res.ok){
        const txt = await res.text().catch(()=>'');
        throw new Error(txt || res.statusText || 'API error');

    }

    const text = await res.text();
    return (text ? JSON.parse(text): null) as T;
    
}

export async function getBooks() : Promise<Book[]> {
    const res = await fetch(`${API_BASE}/books`);
    return handleRes<Book[]>(res);
    
}

export async function addBook( book: NewBook) : Promise <Book> {
    const res = await fetch(`${API_BASE}/books`,{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(book),
    });
    return handleRes<Book>(res);
    
}

export async function upadateBook(id:number,book : NewBook) : Promise<Book> {
    const res = await fetch(`${API_BASE}/books/${id}`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    
});
    return handleRes<Book>(res);
}
export async function  deletBook (id:number):Promise <void> {
    const res = await fetch(`${API_BASE}/books/${id}`,{
        method : 'DELETE'
    });
    await handleRes<void>(res);
    
}

